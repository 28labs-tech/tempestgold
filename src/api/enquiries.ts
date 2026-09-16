import axios from "axios";
export type Enquiry = {
  requestId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  property: string;
  intent: string;
  message: string;
  consent: boolean;
};
export async function sendEnquiry(enquiry: Enquiry) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL || "http://localhost:4000/api"}/enquiries`,
      enquiry,
      { timeout: 45000 },
    );
    return data as { status: "sent" | "captured"; reference: string };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(
        typeof message === "string"
          ? message
          : error.code === "ECONNABORTED"
            ? "Confirmation timed out. Wait a moment, then retry using this form."
            : "Your enquiry could not be sent. Please check your connection and try again.",
      );
    }
    throw error;
  }
}
