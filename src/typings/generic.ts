import { ReactNode } from "react";

import { ZodType } from "zod";

export type LayoutProps = Readonly<{ children: ReactNode }>;

export type ZodSchemaType<Value extends ZodType> = Awaited<ReturnType<Value["parseAsync"]>>;
