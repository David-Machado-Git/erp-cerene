// export const hexToRgb = (hex: string) => {
//   // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
//   const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

//   hex = hex.replace(
//     shorthandRegex,
//     (m: string, r: string, g: string, b: string) => {
//       return r + r + g + g + b + b;
//     }
//   );

//   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

//   return result
//     ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
//         result[3],
//         16
//       )}`
//     : null;
// };

export const hexToRgb = (hex: string): string => {
  // Verifica se o valor de hex é válido
  if (!hex || hex === "undefined") return "0,0,0"; // Valor padrão de RGB (preto) se o valor for inválido

  // Expandir a forma abreviada de cores (e.g., "03F" para "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(
    shorthandRegex,
    (m: string, r: string, g: string, b: string) => {
      return r + r + g + g + b + b;
    }
  );

  // Verifica se o hex está no formato correto (6 dígitos)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  // Se o resultado for válido, converte para RGB; caso contrário, retorna um valor padrão
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )}`
    : "0,0,0"; // Valor padrão caso a cor hexadecimal não seja válida
};
