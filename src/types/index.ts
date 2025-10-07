export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
    skills: string[];
    joinedDate: string;
    completedTasks: number;
    isVerified: boolean;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    category: string;
    budget: {
        min: number;
        max: number;
    };
    deadline: string;
    skillsRequired: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
    status: 'Open' | 'In Progress' | 'Completed' | 'Cancelled';
    clientId: string;
    client: User;
    proposals: Proposal[];
    createdAt: string;
    updatedAt: string;
    tags: string[];
    attachments?: string[];
}

export interface Proposal {
    id: string;
    taskId: string;
    freelancerId: string;
    freelancer: User;
    message: string;
    proposedPrice: number;
    estimatedDuration: string;
    status: 'Pending' | 'Accepted' | 'Rejected';
    createdAt: string;
}

export interface Review {
    id: string;
    taskId: string;
    reviewerId: string;
    revieweeId: string;
    reviewer: User;
    reviewee: User;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    isRead: boolean;
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'task' | 'proposal' | 'message' | 'payment' | 'review';
    isRead: boolean;
    createdAt: string;
}