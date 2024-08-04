export type newEmployeeObject = {
  name: string;
  contacts: {
    email: string;
    phone_no: string;
  };
  address: {
    line: string;
    country: string;
    city: string;
    zipcode: string;
  };
};

export type employeeObject = {
  _id: string;
  name: string;
  address: string;
  email: string;
  phone_no: number;
};
