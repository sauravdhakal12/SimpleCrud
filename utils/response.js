// Format for response
export default class Response {
  #message;
  #data;

  constructor(params) {
    this.#message = params.message || "";
    this.#data = params.data || {};
  }

  get raw() {
    return {
      success: true,
      message: this.#message,
      data: this.#data,
    };
  };
}
