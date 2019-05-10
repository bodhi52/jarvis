export interface SaySayInterface {
    id: number;
    user_id: number;
    content: string;
    status: number;
    // 标签
    tags?: string[];
    // images
    images?: string[];
    // 创建时间
    created_at: string;
    updated_at: string;
    user_info: {
        name: string;
        email: string;
        face: string;
    };
}
