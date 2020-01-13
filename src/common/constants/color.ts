const Color = {
  Red: {
    default: "#f44336",
    50: "#ffebee",
    100: "#ffcdd2",
    200: "#ef9a9a",
    300: "#e57373",
    400: "#ef5350",
    500: "#f44336",
    600: "#e53935",
    700: "#d32f2f",
    800: "#c62828",
    900: "#b71c1c"
  },
  Black: {
    default: "#555",
    50: "#000",
    100: "#111",
    200: "#222",
    300: "#333",
    400: "#444",
    500: "#555",
    600: "#666",
    700: "#777",
    800: "#888",
    900: "#999"
  },
  Brand: {
    default: "#4285F4",
    50: "#002497",
    100: "#003eb1",
    200: "#1158cb",
    300: "#2b72e5",
    400: "#4285F4",
    500: "#5fa6ff",
    600: "#79c0ff",
    700: "#93daff",
    800: "#adf4ff",
    900: "#c7ffff"
  },
  BrandSub: "#76B9FF",
  Default: "#333",
  WeakBlack: "#858585",
  Gray: "#c6c6c6",
  HoverGray: "#f5f5f5",
  White: "#fff",
  BlueWhite: "#FAFDFF",
  Link: "#7294b8",
  ButtonHover: "#444",
  ButtonDisabled: "e6e6e6",
  toRGB: (colorCodeHex: string): string => {
    let hex = colorCodeHex.replace("#", "");
    if (hex.length === 3) {
      hex =
        hex.slice(0, 1) +
        hex.slice(0, 1) +
        hex.slice(1, 2) +
        hex.slice(1, 2) +
        hex.slice(2, 3) +
        hex.slice(2, 3);
    }
    const hexLength = hex.length;
    if (hexLength === 6) {
      const [rHex, gHex, bHex] = [
        hex.substr(0, 2),
        hex.substr(2, 2),
        hex.substr(4, 2)
      ];
      return [parseInt(rHex, 16), parseInt(gHex, 16), parseInt(bHex, 16)].join(
        ", "
      );
    } else {
      return "0, 0, 0";
    }
  }
} as const;
export default Color;
