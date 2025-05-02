type TDependencies = {
  dependencies?: string[];
  devDependencies?: string[];
};

export const dependencies: Record<string, TDependencies> = {
  button: {
    dependencies: ["@mui/material"],
  },
};
