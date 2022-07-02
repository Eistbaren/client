import React from 'react';
import { Paginated } from './api';

/**
 * Class for easily handling paginaged apis
 */
export default class PaginatedApi<T> {
  private _currentData: T[];
  private _setCurrentData: React.Dispatch<React.SetStateAction<T[]>>;

  private _currentPagination: Paginated;
  private _setCurrentPagination: React.Dispatch<
    React.SetStateAction<Paginated>
  >;

  private _isLoading: boolean;
  private _setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;

  private _loadFunction: (pagination: Paginated) => Promise<[Paginated, T[]]>;

  private _shouldLoadAllPages: boolean;

  /**
   * LoadFunctionCallback
   * @name LoadFunctionCallback
   * @param {Paginated} pagination the current pagination
   * @returns {Promise<[Paginated, T[]]>} new pagination and array of data
   * @function
   */

  /**
   * Constructor
   * @param {number} pageSize the pageSize to use
   * @param {LoadFunctionCallback} loadFunction the function to call for loading data
   * @param {boolean} loadAllPages if set to true, all pages will be loaded on initialization
   */
  constructor(
    pageSize: number,
    loadFunction: (pagination: Paginated) => Promise<[Paginated, T[]]>,
    loadAllPages = false,
  ) {
    [this._isLoading, this._setIsLoading] = React.useState<boolean>(true);
    [this._currentData, this._setCurrentData] = React.useState<T[]>([]);
    [this._currentPagination, this._setCurrentPagination] =
      React.useState<Paginated>({
        currentPage: 0,
        pageSize: pageSize,
      });

    this._loadFunction = loadFunction;
    this._shouldLoadAllPages = loadAllPages;
  }

  /**
   * Get the data state
   * @return {T[]} array of data
   */
  public data() {
    return this._currentData;
  }

  /**
   * Get the loading state
   * @return {boolean} if the api is currently busy
   */
  public isLoading() {
    return this._isLoading;
  }

  /**
   * Get the pagination state
   * @return {Paginated} the current pagination
   */
  public pagination() {
    return this._currentPagination;
  }

  /**
   * Load the next page
   * @return {void}
   */
  public loadNextPage() {
    if (
      this._currentPagination.currentPage === undefined ||
      this._currentPagination.totalPages === undefined ||
      this._shouldLoadAllPages
    )
      return;
    if (
      this._currentPagination.currentPage >= this._currentPagination.totalPages
    )
      return;

    this._currentPagination.currentPage++;
    this._loadCurrentPage();
  }

  /**
   * Check whether we are at the last page
   * @return {boolean} whether we are at the last page yet
   */
  public atLastPage() {
    return (
      (this._currentPagination.currentPage ?? 0) >=
      (this._currentPagination.totalPages ?? 0) - 1
    );
  }

  /**
   * Get all states
   * @return {[boolean, T[], Paginated]} all state variables
   */
  public state(): [boolean, T[], Paginated] {
    return [this._isLoading, this._currentData, this._currentPagination];
  }

  /**
   * Initially load the data
   */
  public initialLoad() {
    this._currentPagination.currentPage = 0;
    this._setCurrentData([]);
    this._currentData = [];

    if (this._shouldLoadAllPages) {
      this._loadAllPages();
    } else {
      this._loadCurrentPage();
    }
  }

  /**
   * Reset internal state
   */
  public reset() {
    this._setCurrentData([]);
    this._currentData = [];
  }

  /**
   * Load the current page
   */
  private _loadCurrentPage() {
    this._setIsLoading(true);
    this._loadFunction(this._currentPagination)
      .then(result => {
        const [pagination, data] = result;
        this._setCurrentPagination(pagination);
        this._setCurrentData(this._currentData.concat(data));
        this._setIsLoading(false);
      })
      .catch(() => {
        this._setIsLoading(false);
      });
  }

  /**
   * Load all pages
   * @return {void}
   */
  public _loadAllPages() {
    this._setIsLoading(true);

    // Recoursively load all pages
    // there shouldn't be any stack issues, as the function just starts the request and returns after that
    const loadNextPage = () => {
      this._loadFunction(this._currentPagination)
        .then(result => {
          const [pagination, data] = result;
          this._setCurrentPagination(pagination);
          this._setCurrentData(this._currentData.concat(data));
          if (
            (pagination.currentPage ?? 0) >=
            (pagination.totalPages ?? 0) - 1
          ) {
            this._setIsLoading(false);
          } else {
            loadNextPage();
          }
        })
        .catch(() => {
          console.log('Error loading data!');
          this._setIsLoading(false);
        });
    };

    loadNextPage();
  }
}
