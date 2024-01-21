export const createNotAuthenticatedResponse = () => {
  return Response.json(
    {
      data: null,
      error: {
        message: 'Not Authenticated',
      },
    },
    { status: 401 }
  );
};

export const createNotAuthorizedResponse = () => {
  return Response.json(
    {
      data: null,
      error: {
        message: 'Not Authorized to perform action',
      },
    },
    { status: 403 }
  );
};
