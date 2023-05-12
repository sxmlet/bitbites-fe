/**
 * Defines the structure of a bite creation request.
 */
export interface PostBite {
  title: string,
  content: string,
  filename?: string,
}