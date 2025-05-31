import db from "../lib/db.js";

const getTranslationById = async (id: string) => {
  const translation = await db.translation.findUnique({ where: { id } });
  return translation;
};

export { getTranslationById };
