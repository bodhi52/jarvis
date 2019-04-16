export interface SaySayInterface {
    id: number;
    // 说说的内容
    content: string;
    // 标签
    tags: string[];
    // images
    images?: string[];
    // 创建时间
    created_at: string;
    user_id: string;
    user_name: string;
    user_image: string;
}
