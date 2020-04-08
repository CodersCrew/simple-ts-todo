export abstract class Collection {
  private collection = [];

  /**
   * Gets all elements from the collection
   * @returns array with all collection elements
   */
  findAll = () => {}

  /**
   * Gets number of items in the collection
   * @returns number of items in the collection
   */
  length = () => {}

  /**
   * Gets the particular element from the collection by its id.
   * @param id - id of the element we want to find
   * @returns a particular element from the collection
   */
  findOne = () => {}

  /**
   * Adds a new element to the collection
   * @param element - element we want to add
   */
  add = () => {}

  /**
   * Updates a particular element in the collection
   * @param id - id of the element we want to update
   * @param change - partial of the element we want to update
   */
  update = () => {}

   /**
   * Removes a particular element from the collection
   * @param id - id of the element we want to remove
   */
  remove = (id: string) => {
    this.collection = this.collection.filter((element) => element.id !== id);
  }

   /**
   * Removes all elements that matches given criteria from the collection
   * @param cb - callback invoked for every collection item. Returns true for elements that should be deleted
   */
  removeBy = () => {}
}
