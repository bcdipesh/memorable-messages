"use strict";

import axios from "axios";
import { jwtDecode } from "jwt-decode";

import ErrorHandler from "@/lib/errorHandler";

// Base URL for API requests (configurable through Vite environment variables)
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

/**
 * API class for interacting with the backend.
 *
 * This class provides methods for sending requests to the API, handling errors,
 * and returning the response data or throwing informative errors.
 */
class MemorableMessagesApi {
  // Token for authorizing API requests (stored in static property)
  static token;

  /**
   * Sends a request to the API and processes the response.
   *
   * @param {string} endpoint The API endpoint to call.
   * @param {object} [data={}] Optional data to send in the request body.
   * @param {string} [method="GET"] The HTTP method to use.
   * @returns {Promise<any>} Promise resolving to the response data or rejecting with an error object.
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

      // Check for API-specific error responses
      if (response.data.error) {
        const { message, code: statusCode } = response.data.error;
        throw new ErrorHandler(statusCode, message);
      }

      return response.data;
    } catch (err) {
      // Handle network errors
      if (!err.response) {
        throw new Error(`Network error: ${err.message}`);
      }

      // Handle API errors with user-friendly messages and details
      const {
        status: statusCode,
        data: { message },
      } = err.response;
      throw new ErrorHandler(statusCode, message);
    }
  }

  // API routes

  /**
   * Logs in a user and returns the access token.
   *
   * @param {string} username The username for login.
   * @param {string} password The password for login.
   * @returns {Promise<string>} Promise resolving to the access token.
   */
  static async login(username, password) {
    const resp = await this.request(
      "auth/login",
      { username, password },
      "POST",
    );

    return resp.access_token;
  }

  /**
   * Registers a new user and returns the access token.
   *
   * @param {object} userData User data for registration.
   * @param {string} userData.username The username.
   * @param {string} userData.password The password.
   * @param {string} userData.email The email address.
   * @returns {Promise<string>} Promise resolving to the access token.
   */
  static async register({ username, password, email }) {
    const resp = await this.request(
      "auth/register",
      {
        username,
        password,
        email,
      },
      "POST",
    );

    return resp.access_token;
  }

  /**
   * Retrieves the current user's details.
   *
   * @returns {Promise<object>} Promise resolving to the user details object.
   */
  static async getCurrentUserDetails() {
    const decodedToken = jwtDecode(MemorableMessagesApi.token);
    const resp = await this.request(`users/${decodedToken.sub}`);

    return resp;
  }

  /**
   * Updates the current user's details.
   *
   * @param {object} updatedDetails Updated user details.
   * @param {string} updatedDetails.username (optional) The new username.
   * @param {string} updatedDetails.email (optional) The new email address.
   * @param {string} updatedDetails.password (optional) The new password.
   * @returns {Promise<object>} Promise resolving to the updated user details object.
   */
  static async updateUserDetails({ username, email, password }) {
    const decodedToken = jwtDecode(MemorableMessagesApi.token);
    const updatedDetails = { username, email };
    if (password) {
      updatedDetails.password = password;
    }

    const resp = await this.request(
      `users/${decodedToken.sub}`,
      updatedDetails,
      "PUT",
    );

    return resp;
  }

  /**
   * Retrieves all occasions for the current user.
   *
   * @returns {Promise<object[]>} Promise resolving to an array of occasion objects.
   */
  static async getUserOccasions() {
    const decodedToken = jwtDecode(MemorableMessagesApi.token);
    const resp = await this.request(`users/${decodedToken.sub}/occasions`);

    return resp.occasions;
  }

  /**
   * Retrieves an occasion by its ID.
   *
   * @param {string} id The ID of the occasion to retrieve.
   * @returns {Promise<object>} Promise resolving to the occasion object.
   */
  static async getOccasionById(id) {
    const resp = await this.request(`occasions/${id}`);

    return resp.occasion;
  }

  /**
   * Deletes an occasion by its ID.
   *
   * @param {string} id The ID of the occasion to delete.
   * @returns {Promise<void>} Promise that resolves when the occasion is deleted.
   */
  static async deleteOccasionById(id) {
    await this.request(`occasions/${id}`, {}, "DELETE");
  }

  /**
   * Creates a new occasion.
   *
   * @param {object} occasionData Data for the new occasion.
   * @param {string} occasionData.occasion_type The type of occasion.
   * @param {string} occasionData.message_content The message content for the occasion.
   * @param {string} occasionData.receiver_email (optional) The recipient's email address.
   * @param {string} occasionData.receiver_phone (optional) The recipient's phone number.
   * @param {string} occasionData.delivery_method The delivery method for the occasion.
   * @param {string} occasionData.date_time The date and time for the occasion.
   * @returns {Promise<object>} Promise resolving to the created occasion object.
   */
  static async createOccasion({
    occasion_type,
    message_content,
    receiver_email,
    receiver_phone,
    delivery_method,
    date_time,
  }) {
    const decodedToken = jwtDecode(MemorableMessagesApi.token);
    const resp = await this.request(
      `users/${decodedToken.sub}/occasions`,
      {
        occasion_type,
        message_content,
        receiver_email,
        receiver_phone,
        delivery_method,
        date_time,
      },
      "POST",
    );

    return resp;
  }
}

export default MemorableMessagesApi;
