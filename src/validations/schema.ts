import { z } from "zod";

export const transactionSchema = z.object({
    type: z.enum(["income", "expense"]),
    date: z.string().min(1, { message: "日付の入力は必須です" }),
    amount: z.number().min(1, { message: "金額の1円以上である必要があります" }),
    content: z
        .string()
        .min(1, { message: "内容の入力は必須です" })
        .max(50, { message: "内容は50字以内で入力してください" }),
    category: z
        .union([
            z.enum(["食費", "日用品", "交際費", "娯楽", "交通費"]),
            z.enum(["給与", "副収入", "お小遣い"]),
            z.literal(""),
        ])
        .refine((val) => val !== "", {
            message: "カテゴリを選択して下さい",
        }),
});

export type Schema = z.infer<typeof transactionSchema>;
