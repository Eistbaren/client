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

  /**
   * LoadFunctionCallback
   * @name LoadFunctionCallback
   * @param {Paginated} pagination the current pagination
   * @returns {Promise<[Paginated, T[]]>} new pagination and array of data
   * @function
   */

  /**
   *
   * @param {number} pageSize the pageSize to use
   * @param {LoadFunctionCallback} loadFunction the function to call for loading data
   */
  constructor(
    pageSize: number,
    loadFunction: (pagination: Paginated) => Promise<[Paginated, T[]]>,
  ) {
    [this._isLoading, this._setIsLoading] = React.useState<boolean>(true);
    [this._currentData, this._setCurrentData] = React.useState<T[]>([]);
    [this._currentPagination, this._setCurrentPagination] =
      React.useState<Paginated>({
        currentPage: 0,
        pageSize: pageSize,
      });

    this._loadFunction = loadFunction;

    React.useEffect(() => {
      this._initialLoad();
    }, []);
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
   *
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
      this._currentPagination.totalPages === undefined
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
   *
   * @return {boolean} whether we are at the last page yet
   */
  public atLastPage() {
    return (
      (this._currentPagination.currentPage ?? 0) ===
      (this._currentPagination.totalPages ?? 0) - 1
    );
  }

  /**
   * Initially load the data
   */
  private _initialLoad() {
    this._currentPagination.currentPage = 0;
    this._setCurrentData([]);
    this._loadCurrentPage();
  }

  /**
   * Load the current page
   */
  private _loadCurrentPage() {
    this._setIsLoading(true);
    this._loadFunction(this._currentPagination).then(result => {
      const [pagination, data] = result;
      this._setCurrentPagination(pagination);
      this._setCurrentData(this._currentData.concat(data));
      this._setIsLoading(false);
    });
  }
}
