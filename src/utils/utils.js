export const returnErrorFromFirebase = (error) => {
  let errorMessage;
  switch (error) {
    case 'auth/email-already-in-use':
      errorMessage = 'O endereço de e-mail já está em uso por outra conta.';
      break;

    case 'invalid-user-token':
      errorMessage =
        'A credencial do usuário não é mais válida. O usuário deve entrar novamente';
      break;

    default:
      errorMessage = 'Ocorreu um erro!';
      break;
  }
  return errorMessage;
};
