import { MantineProvider } from "@mantine/core";
import MainLayout from "./components/Layouts/MainLayout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "light",
        white: "#fff",
        black: "#000",
        colors: {
          primary: [
            "#E9EDFB",
            "#BDC7F3",
            "#96A6EC",
            "#6E85E5",
            "#4764DE",
            "#2545CF",
            "#1E38A8",
            "#172B81",
            "#0F1C54",
            "#080F2D",
          ],
          error: [
            "#FEF2F2",
            "#FEE2E2",
            "#FECACA",
            "#FCA5A5",
            "#F87171",
            "#EF4444",
            "#DC2626",
            "#B91C1C",
            "#991B1B",
            "#7F1D1D",
          ],
          neutral: [
            "#FAFAFA",
            "#F5F5F5",
            "#E5E5E5",
            "#D4D4D4",
            "#A3A3A3",
            "#737373",
            "#525252",
            "#404040",
            "#262626",
            "#171717",
          ],
          success: [
            "#F0FDF4",
            "#DCFCE7",
            "#BBF7D0",
            "#86EFAC",
            "#4ADE80",
            "#22C55E",
            "#16A34A",
            "#15803D",
            "#166534",
            "#14532D",
          ],
          info: [
            "#F0F9FF",
            "#E0F2FE",
            "#BAE6FD",
            "#7DD3FC",
            "#38BDF8",
            "#0EA5E9",
            "#0284C7",
            "#0369A1",
            "#075985",
            "#0C4A6E",
          ],
          warning: [
            "#FFFBEB",
            "#FEF3C7",
            "#FDE68A",
            "#FCD34D",
            "#FBBF24",
            "#F59E0B",
            "#D97706",
            "#B45309",
            "#92400E",
            "#78350F",
          ],
          black: [
            "#000000",
            "#222020", // raisin black
          ],
        },
        primaryColor: "primary",
        primaryShade: 9,
        fontFamily: "Manrope",
        lineHeight: 1.55,
        components: {
          Checkbox: {
            defaultProps: {
              styles: {
                input: {
                  border: "1.5px solid gray",
                  cursor: "pointer",
                },
                label: {
                  fontSize: 14,
                  fontWeight: 500,
                },
              },
            },
          },
        },
      }}
    >
      <MainLayout />
      <ToastContainer />
    </MantineProvider>
  );
}
