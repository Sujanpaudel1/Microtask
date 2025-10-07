import Link from 'next/link';
import { Task } from '@/types';
import { formatCurrency, formatDateRelative, cn } from '@/lib/utils';
import { Clock, DollarSign, User, Star } from 'lucide-react';

interface TaskCardProps {
    task: Task;
    className?: string;
}

export function TaskCard({ task, className }: TaskCardProps) {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-100 text-green-800';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'Hard':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Open':
                return 'bg-blue-100 text-blue-800';
            case 'In Progress':
                return 'bg-orange-100 text-orange-800';
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className={cn('bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200', className)}>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <Link href={`/tasks/${task.id}`} className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors leading-tight">
                            {task.title}
                        </h3>
                    </Link>
                    <div className="flex space-x-2 ml-4">
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getDifficultyColor(task.difficulty))}>
                            {task.difficulty}
                        </span>
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(task.status))}>
                            {task.status}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {task.description}
                </p>

                {/* Budget and Deadline */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-green-600">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold">
                                {formatCurrency(task.budget.min)} - {formatCurrency(task.budget.max)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                                Due {new Date(task.deadline).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Skills Required */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {task.skillsRequired.slice(0, 3).map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                            >
                                {skill}
                            </span>
                        ))}
                        {task.skillsRequired.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">
                                +{task.skillsRequired.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Client Info and Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">{task.client.name}</p>
                            <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500">
                                    {task.client.rating} ({task.client.reviewCount} reviews)
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-gray-500">Posted</p>
                        <p className="text-xs text-gray-900">{formatDateRelative(task.createdAt)}</p>
                    </div>
                </div>

                {/* Action Button */}
                {task.status === 'Open' && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <Link
                            href={`/tasks/${task.id}`}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block text-sm font-medium"
                        >
                            View Details & Apply
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}