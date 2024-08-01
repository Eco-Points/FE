import "@testing-library/jest-dom";

import { render, screen, within, fireEvent, waitFor, act } from "@/__tests__/test-utils";
import axiosWithConfig from "@/utils/apis/axios-with-config";
import { Mocked, vi } from "vitest";

import Register from "@/pages/auth/register";

vi.mock("@/utils/apis/axios-with-config");

const mockedAxios = axiosWithConfig as Mocked<typeof axiosWithConfig>;

describe("Register Page", () => {
  beforeEach(async () => {
    await act(async () => {
      render(<Register />);
    });
  });

  describe("Renders the page", () => {
    it("should render the page", () => {
      const form = screen.getByTestId("form-login");
      expect(form).toBeTruthy();

      expect(within(form).getByTestId("input-full-name")).toBeTruthy();
      expect(within(form).getByTestId("input-email")).toBeTruthy();
      expect(within(form).getByTestId("input-password")).toBeTruthy();
      expect(within(form).getByTestId("input-repassword")).toBeTruthy();
      expect(within(form).getByTestId("btn-submit")).toBeTruthy();
    });

    it("should display values inside input components", () => {
      const form = screen.getByTestId("form-login");
      const fullname = within(form).getByTestId("input-full-name");
      const email = within(form).getByTestId("input-email");
      const password = within(form).getByTestId("input-password");
      const repassword = within(form).getByTestId("input-repassword");

      fireEvent.change(fullname, { target: { value: "John Doe" } });
      fireEvent.change(email, { target: { value: "johndoe@mail.com" } });
      fireEvent.change(password, { target: { value: "password123" } });
      fireEvent.change(repassword, { target: { value: "password123" } });

      expect(fullname).toHaveValue("John Doe");
      expect(email).toHaveValue("johndoe@mail.com");
      expect(password).toHaveValue("password123");
      expect(repassword).toHaveValue("password123");
    });
  });

  describe("Action for Register page", () => {
    it("should show error messages when inputs are missing values", async () => {
      const form = screen.getByTestId("form-login");
      await act(async () => {
        fireEvent.click(within(form).getByTestId("btn-submit"));
      });

      expect(within(form).getByText("Nama lengkap wajib diisi")).toBeTruthy();
      expect(within(form).getByText("Email wajib diisi")).toBeTruthy();
      expect(within(form).getByText("Kata sandi minimal 6 karakter")).toBeTruthy();
      expect(within(form).getByText("Konfirmasi kata sandi minimal 6 karakter")).toBeTruthy();
    });

    it("should display error toast when passwords do not match", async () => {
      const form = screen.getByTestId("form-login");
      const fullname = within(form).getByTestId("input-full-name");
      const email = within(form).getByTestId("input-email");
      const password = within(form).getByTestId("input-password");
      const repassword = within(form).getByTestId("input-repassword");

      fireEvent.change(fullname, { target: { value: "John Doe" } });
      fireEvent.change(email, { target: { value: "johndoe@mail.com" } });
      fireEvent.change(password, { target: { value: "password123" } });
      fireEvent.change(repassword, { target: { value: "differentpass" } });

      await act(async () => {
        fireEvent.click(within(form).getByTestId("btn-submit"));
      });

      await waitFor(() => {
        expect(screen.getByText("Kata sandi tidak cocok")).toBeTruthy();
      });
    });

    it("should display failed toast when registration fails", async () => {
      const form = screen.getByTestId("form-login");
      const fullname = within(form).getByTestId("input-full-name");
      const email = within(form).getByTestId("input-email");
      const password = within(form).getByTestId("input-password");
      const repassword = within(form).getByTestId("input-repassword");

      fireEvent.change(fullname, { target: { value: "John Doe" } });
      fireEvent.change(email, { target: { value: "johndoe@mail.com" } });
      fireEvent.change(password, { target: { value: "password123" } });
      fireEvent.change(repassword, { target: { value: "password123" } });

      mockedAxios.post.mockRejectedValueOnce({
        response: {
          data: {
            code: 400,
            status: "failed",
            message: "user register failed",
          },
        },
      });

      await act(async () => {
        fireEvent.click(within(form).getByTestId("btn-submit"));
      });

      await waitFor(() => {
        expect(screen.getByText("user register failed")).toBeTruthy();
      });
    });

    it("should display successful toast when registration is successful", async () => {
      const form = screen.getByTestId("form-login");
      const fullname = within(form).getByTestId("input-full-name");
      const email = within(form).getByTestId("input-email");
      const password = within(form).getByTestId("input-password");
      const repassword = within(form).getByTestId("input-repassword");

      fireEvent.change(fullname, { target: { value: "John Doe" } });
      fireEvent.change(email, { target: { value: "johndoe@mail.com" } });
      fireEvent.change(password, { target: { value: "password123" } });
      fireEvent.change(repassword, { target: { value: "password123" } });

      mockedAxios.post.mockResolvedValueOnce({
        data: {
          code: 201,
          status: "success",
          message: "user register successful",
        },
      });

      await act(async () => {
        fireEvent.click(within(form).getByTestId("btn-submit"));
      });
    });

    it("should handle unexpected errors gracefully", async () => {
      const form = screen.getByTestId("form-login");
      const fullname = within(form).getByTestId("input-full-name");
      const email = within(form).getByTestId("input-email");
      const password = within(form).getByTestId("input-password");
      const repassword = within(form).getByTestId("input-repassword");

      fireEvent.change(fullname, { target: { value: "John Doe" } });
      fireEvent.change(email, { target: { value: "johndoe@mail.com" } });
      fireEvent.change(password, { target: { value: "password123" } });
      fireEvent.change(repassword, { target: { value: "password123" } });

      mockedAxios.post.mockRejectedValueOnce({
        response: {
          data: {
            code: 500,
            status: "error",
            message: "an unexpected error occurred",
          },
        },
      });

      await act(async () => {
        fireEvent.click(within(form).getByTestId("btn-submit"));
      });

      await waitFor(() => {
        expect(screen.getByText("an unexpected error occurred")).toBeTruthy();
      });
    });
  });
});
