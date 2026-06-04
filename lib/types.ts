export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}