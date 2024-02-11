import axios from "axios";
import ErrorHandler from "@/lib/errorHandler";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

/**
 * API Class.
 *
 * Static class tying together methods used to get/send requests to the API.
 * This class aims to provide robust error handling, informative error messages,
 * and user-friendly APIs for interacting with your backend.
 */
class MemorableMessagesApi {
  // Token for interaction with the API will be stored here.
  static token;

  /**
   * Sends a request to the API, handling errors gracefully and returning
   * the response data or throwing an error with detailed information.
   *
   * @param {string} endpoint The API endpoint to call.
   * @param {object} [data={}] Optional data to send in the request body.
   * @param {string} [method="GET"] The HTTP method to use.
   * @returns {Promise<any>} Promise resolving to the response data or rejecting
   * with an error object containing details.
   */
  static async request(endpoint, data = {}, method = "GET") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${MemorableMessagesApi.token}`,
    };
    const params = method === "GET" ? data : {};

    try {
      const response = await axios({
        url,
        method,
        data,
        params,
        headers,
      });

      // Check for API-specific error responses.
      if (response.data.error) {
        const { message, code: statusCode } = response.data.error;
        throw new ErrorHandler(statusCode, message);
      }

      return response.data;
    } catch (err) {
      // Handle network errors and other unexpected exceptions.
      if (!err.response) {
        throw new Error(`Network error: ${err.message}`);
      }

      // Handle API errors with user-friendly messages and details.
      const {
        status: statusCode,
        data: { message },
      } = err.response;
      throw new ErrorHandler(statusCode, message);
    }
  }

  // API routes.

  static async login(username, password) {
    const res = await this.request(
      "auth/login",
      { username, password },
      "POST",
    );

    return res.access_token;
  }

  static async register({ username, password, email }) {
    const res = await this.request(
      "auth/register",
      {
        username,
        password,
        email,
      },
      "POST",
    );

    return res.access_token;
  }
}

export default MemorableMessagesApi;
