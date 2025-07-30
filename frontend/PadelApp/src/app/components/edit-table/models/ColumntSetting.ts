interface BaseColumn<T> {
  key: keyof T;
  title: string;
  editable: boolean;
}

interface SelectColumn<T> extends BaseColumn<T> {
  type: "select";
  options: { id: any; name: string }[];
}

interface NonSelectColumn<T> extends BaseColumn<T> {
  type?: "date" | "time" | undefined;
  options?: never;
  max?:string,
  min?:string
}

export type EditTableColumn<T> = SelectColumn<T> | NonSelectColumn<T>;