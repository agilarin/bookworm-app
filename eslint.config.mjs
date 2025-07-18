import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@mui/material",
              message:
                "Импортируй конкретный компонент, например: @mui/material/TextField",
            },
            {
              name: "@mui/icons-material",
              message:
                "Импортируй конкретную иконку, например: @mui/icons-material/Add",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
