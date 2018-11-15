export interface TodoInterface {
    id: number;
    // 是否完成
    is_done: number;
    // 内容
    content: string;
    // 创建时间
    created_at: number;
    // 更新时间
    updated_at: number;
    // todo所属的tag
    tag: number;
}


