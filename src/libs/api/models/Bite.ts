/**
 * Defines a general structure of a Bite.
 *
 * This type is the most generic one, passed around in the application.
 */
export interface Bite {
  id?: number;
  title: string;
  content: string;
  file?: File|null;
  url?: string;
}
