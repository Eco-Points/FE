import "@testing-library/jest-dom";

import { render, screen, within, fireEvent, act, waitFor } from "@/__tests__/test-utils";
import axiosWithConfig from "@/utils/apis/axios-with-config";
import { Mocked, vi } from "vitest";

import App from "@/pages/auth/login";

vi.mock("@/utils/apis/axios-with-config");

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;

describe("Login Page", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<App />);
    });
  });

  describe("Renders the page", () => {
    it("should render the page", () => {
      const form = screen.getByTestId("form-login");
      expect(form).toBeTruthy();

      expect(within(form).getByTestId("input-email")).toBeTruthy();
      expect(within(form).getByTestId("input-password")).toBeTruthy();
      expect(within(form).getByTestId("btn-submit")).toBeTruthy();
    });

    it("should display values inside input components", () => {
      const form = screen.getByTestId("form-login");
      const email = within(form).getByTestId("input-email");
      const password = within(form).getByTestId("input-password");

      fireEvent.change(email, { target: { value: "ardi@gmail.com" } });
      fireEvent.change(password, { target: { value: "aaaaaa" } });

      expect(email).toHaveValue("ardi@gmail.com");
      expect(password).toHaveValue("aaaaaa");
    });
  });

  describe("Action for Login page", () => {
    it("should show error messages when inputs are missing values", async () => {
      const form = screen.getByTestId("form-login");
      await act(async () => {
        fireEvent.click(within(form).getByTestId("btn-submit"));
      });

      expect(within(form).getByText("Email wajib diisi")).toBeTruthy();
      expect(within(form).getByText("Kata sandi minimal 6 karakter")).toBeTruthy();
    });

    it("should display failed toast when using incorrect credentials (password)", async () => {
      const form = screen.getByTestId("form-login");
      const email = within(form).getByTestId("input-email");
      const password = within(form).getByTestId("input-password");

      fireEvent.change(email, { target: { value: "ardi@gmail.com" } });
      fireEvent.change(password, { target: { value: "wrongpass" } });

      mockedAxios.post.mockRejectedValueOnce({
        response: {
          data: {
            code: 400,
            status: "failed",
            message: "user login failed",
          },
        },
      });

      await act(async () => {
        fireEvent.click(within(form).getByTestId("btn-submit"));
      });

      await waitFor(() => {
        expect(screen.getByText("user login failed")).toBeTruthy();
      });
    });

    it("should display failed toast when using incorrect credentials (email)", async () => {
      const form = screen.getByTestId("form-login");
      const email = within(form).getByTestId("input-email");
      const password = within(form).getByTestId("input-password");

      fireEvent.change(email, { target: { value: "nonexistent@mail.com" } });
      fireEvent.change(password, { target: { value: "aaaaaa" } });

      mockedAxios.post.mockRejectedValueOnce({
        response: {
          data: {
            code: 400,
            status: "failed",
            message: "user login failed",
          },
        },
      });

      await act(async () => {
        fireEvent.click(within(form).getByTestId("btn-submit"));
      });

      await waitFor(() => {
        expect(screen.getByText("user login failed")).toBeTruthy();
      });
    });

    it("should display successful toast when using correct credentials", async () => {
      const form = screen.getByTestId("form-login");
      const email = within(form).getByTestId("input-email");
      const password = within(form).getByTestId("input-password");

      fireEvent.change(email, { target: { value: "ardi@gmail.com" } });
      fireEvent.change(password, { target: { value: "aaaaaa" } });

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          code: 200,
          status: "success",
          message: "user login successful",
          data: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MjA0OTY3MzEsInVzZXJJZCI6OX0.7jVdmO5yWtHGEUZtzCha1-tQzy231CCFxln-qmLP2go",
          },
        },
      });

      await act(async () => {
        fireEvent.click(within(form).getByTestId("btn-submit"));
      });

      await waitFor(() => {
        expect(screen.getByText("user login successful")).toBeTruthy();
      });
    });
  });
});
