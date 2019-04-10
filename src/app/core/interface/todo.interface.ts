export interface TodoInterface {
    id: number;
    // 是否完成
    is_done?: number;
    // 状态
    status: number;
    // 状态的名字（在构造数据的时候直接输出，省的浪费资源）
    statusName: string;
    // 内容
    content: string;
    // 创建时间
    created_at: number;
    // 更新时间
    updated_at: number;
    // todo所属的tag
    tag: number;
    // 备注
    mark?: string;
}


