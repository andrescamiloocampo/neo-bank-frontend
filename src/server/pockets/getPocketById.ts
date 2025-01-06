import { Pocket } from "../../models";
import { errorLogs } from "../../utils";

export const getPocketById = async (
  pocketId: string
): Promise<Pocket | null> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SPRING_BACKEND}/pocket?id=${pocketId}`,
      {
        method: "GET",
        headers,
      }
    );
    if (!response.ok) throw new Error(errorLogs[1].message);
    // const resp = await response.json();
    // console.log('Aqui ven aqui:',resp);
    return await response.json();
  } catch (error) {
    throw new Error(`${(errorLogs[0].message, error)}`);
  }
};
