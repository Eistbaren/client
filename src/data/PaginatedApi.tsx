import React from 'react';
import { Paginated } from './api';

/**
 * Class for easily handling paginaged apis
 */
export default class PaginatedApi<T> {
  private _currentDataState: T[];
  private _setCurrentDataState: React.Dispatch<React.SetStateAction<T[]>>;
  private _currentData: React.MutableRefObject<T[]>;

  private _currentPaginationState: Paginated;
  private _setCurrentPaginationState: React.Dispatch<
    React.SetStateAction<Paginated>
  >;
  private _currentPagination: React.MutableRefObject<Paginated>;

  private _isLoadingState: boolean;
  private _setIsLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  private _isLoading: React.MutableRefObject<boolean>;

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
    [this._isLoadingState, this._setIsLoadingState] =
      React.useState<boolean>(true);
    this._isLoading = React.useRef<boolean>(false);

    [this._currentDataState, this._setCurrentDataState] = React.useState<T[]>(
      [],
    );
    this._currentData = React.useRef<T[]>([]);

    [this._currentPaginationState, this._setCurrentPaginationState] =
      React.useState<Paginated>({
        currentPage: 0,
        pageSize: pageSize,
      });
    this._currentPagination = React.useRef<Paginated>({});

    this._loadFunction = loadFunction;
    this._shouldLoadAllPages = loadAllPages;
  }

  /**
   * Get the data state
   * @return {T[]} array of data
   */
  public data() {
    return this._currentDataState;
  }

  /**
   * Get the loading state
   * @return {boolean} if the api is currently busy
   */
  public isLoading() {
    return this._isLoadingState;
  }

  /**
   * Get the pagination state
   * @return {Paginated} the current pagination
   */
  public pagination() {
    return this._currentPaginationState;
  }

  /**
   * Load the next page
   * @return {void}
   */
  public loadNextPage() {
    if (
      this._currentPagination.current.currentPage === undefined ||
      this._currentPagination.current.totalPages === undefined ||
      this._shouldLoadAllPages
    )
      return;
    if (
      this._currentPagination.current.currentPage >=
      this._currentPagination.current.totalPages
    )
      return;

    this._currentPagination.current.currentPage++;
    this._setCurrentPagination(this._currentPagination.current);
    this._loadCurrentPage();
  }

  /**
   * Check whether we are at the last page
   * @return {boolean} whether we are at the last page yet
   */
  public atLastPage() {
    const current = this._currentPagination.current.currentPage ?? 0;
    const total = this._currentPagination.current.totalPages;
    return total !== undefined && current >= total;
  }

  /**
   * Get all states
   * @return {[boolean, T[], Paginated]} all state variables
   */
  public state(): [boolean, T[], Paginated] {
    return [
      this._isLoadingState,
      this._currentDataState,
      this._currentPaginationState,
    ];
  }

  /**
   * Initially load the data
   */
  public initialLoad() {
    if (this._isLoading.current) return;
    this.reset();

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
    if (this._isLoading.current) return;
    this._setCurrentPagination({
      ...this._currentPagination.current,
      currentPage: 0,
      totalPages: undefined,
    });

    this._setCurrentData([]);
  }

  /**
   * Set the internal pagination and the external state
   * @param {Paginated} pagination new pagination
   */
  private _setCurrentPagination(pagination: Paginated) {
    this._currentPagination.current = pagination;
    this._setCurrentPaginationState(this._currentPagination.current);
  }

  /**
   * Set the internal loading and external state
   * @param {boolean} isLoading
   */
  private _setIsLoading(isLoading: boolean) {
    this._isLoading.current = isLoading;
    this._setIsLoadingState(this._isLoading.current);
  }

  /**
   * Set the internal data and external state
   * @param {T[]} data
   */
  private _setCurrentData(data: T[]) {
    this._currentData.current = data;
    this._setCurrentDataState(data);
  }

  /**
   * Load the current page
   */
  private _loadCurrentPage() {
    this._setIsLoading(true);
    this._loadFunction(this._currentPagination.current)
      .then(result => {
        const [pagination, data] = result;
        this._setCurrentPagination(pagination);
        this._setCurrentData(this._currentData.current.concat(data));
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
    if (this._isLoading.current) return;
    if (this.atLastPage()) return;
    this._setIsLoading(true);

    // Recoursively load all pages
    // there shouldn't be any stack issues, as the function just starts the request and returns after that
    const loadNextPage = () => {
      this._loadFunction(this._currentPagination.current)
        .then(result => {
          const [pagination, data] = result;
          this._setCurrentPagination(pagination);
          this._setCurrentData(this._currentData.current.concat(data));

          if (this.atLastPage()) {
            this._setIsLoading(false);
          } else {
            this._setCurrentPagination({
              ...this._currentPagination.current,
              currentPage:
                (this._currentPagination.current.currentPage ?? 0) + 1,
            });
            loadNextPage();
          }
        })
        .catch(() => {
          this._setIsLoading(false);
        });
    };

    loadNextPage();
  }
}
