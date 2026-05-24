// Converts MongoDB documents (with ObjectId, Date) into plain JSON-safe objects
export function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}
