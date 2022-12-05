import { ApplicationError } from "@/protocols";

export function capacityError(): ApplicationError {
  return {
    name: "CapacityError",
    message: "Capacity is full!"
  };
}
