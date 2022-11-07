const getErrorMessage = (code) => {
  let message;
  switch (code) {
    case 2627:
      message = "Campo ya existente.";
      break;
    case 241:
      message = "Formato de fecha inválido.";
      break;
    case 515:
      message = "Datos incompletos.";
      break;
    default:
      message = "Error general";
      break;
  }
  return message;
};

export default getErrorMessage;
