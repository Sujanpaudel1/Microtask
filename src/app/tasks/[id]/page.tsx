'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockTasks } from '@/lib/mockData';
import { formatCurrency, formatDate, cn } from '@/lib/utils';
import {
    DollarSign,
    User,
    Star,
    Calendar,
    ArrowLeft,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

interface TaskDetailPageProps {
    params: {
        id: string;
    };
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
    const [proposalText, setProposalText] = useState('');
    const [proposalPrice, setProposalPrice] = useState('');
    const [showProposalForm, setShowProposalForm] = useState(false);

    // Find the task by ID
    const task = mockTasks.find(t => t.id === params.id);

    if (!task) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Task Not Found</h1>
                    <p className="text-gray-600 mb-4">The task you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/tasks" className="text-blue-600 hover:text-blue-700">
                        ← Back to Tasks
                    </Link>
                </div>
            </div>
        );
    }

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

    const handleSubmitProposal = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the proposal to your backend
        alert('Proposal submitted successfully!');
        setShowProposalForm(false);
        setProposalText('');
        setProposalPrice('');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link
                        href="/tasks"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Tasks
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Task Header */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{task.title}</h1>
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getDifficultyColor(task.difficulty))}>
                                            {task.difficulty}
                                        </span>
                                        <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getStatusColor(task.status))}>
                                            {task.status}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Category: {task.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Budget and Deadline */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Budget</p>
                                        <p className="text-lg font-semibold text-green-600">
                                            {formatCurrency(task.budget.min)} - {formatCurrency(task.budget.max)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Deadline</p>
                                        <p className="text-lg font-semibold text-blue-600">
                                            {formatDate(task.deadline)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {task.description}
                                </p>
                            </div>
                        </div>

                        {/* Skills Required */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills Required</h2>
                            <div className="flex flex-wrap gap-2">
                                {task.skillsRequired.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        {task.tags && task.tags.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
                                <div className="flex flex-wrap gap-2">
                                    {task.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Proposals Section (placeholder) */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Proposals ({Math.floor(Math.random() * 10) + 1})
                            </h2>
                            <p className="text-gray-600">
                                Proposals are only visible to the client who posted this task.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Client Info */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Client</h3>
                            <div className="flex items-start space-x-3">
                                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900">{task.client.name}</h4>
                                    <div className="flex items-center space-x-1 mt-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-600">
                                            {task.client.rating} ({task.client.reviewCount} reviews)
                                        </span>
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                            {task.client.completedTasks} tasks completed
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Member since {formatDate(task.client.joinedDate)}
                                        </div>
                                    </div>
                                    {task.client.isVerified && (
                                        <div className="mt-2">
                                            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                Verified Client
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Apply Section */}
                        {task.status === 'Open' && (
                            <div className="bg-white rounded-lg shadow-sm border p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Apply for this Task</h3>

                                {!showProposalForm ? (
                                    <button
                                        onClick={() => setShowProposalForm(true)}
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Submit Proposal
                                    </button>
                                ) : (
                                    <form onSubmit={handleSubmitProposal} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Proposal
                                            </label>
                                            <textarea
                                                value={proposalText}
                                                onChange={(e) => setProposalText(e.target.value)}
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                                placeholder="Describe how you'll complete this task..."
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Price (NPR)
                                            </label>
                                            <input
                                                type="number"
                                                value={proposalPrice}
                                                onChange={(e) => setProposalPrice(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                                placeholder="Enter your price in NPR"
                                                min="1"
                                                required
                                            />
                                        </div>
                                        <div className="flex space-x-3">
                                            <button
                                                type="submit"
                                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                            >
                                                Submit Proposal
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setShowProposalForm(false)}
                                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}

                                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                                    <div className="flex items-start space-x-2">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                                        <div>
                                            <p className="text-sm text-yellow-800 font-medium">
                                                Tips for a winning proposal:
                                            </p>
                                            <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                                                <li>Show relevant experience</li>
                                                <li>Ask clarifying questions</li>
                                                <li>Provide a realistic timeline</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Task Stats */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Posted:</span>
                                    <span className="text-gray-900">{formatDate(task.createdAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Last Updated:</span>
                                    <span className="text-gray-900">{formatDate(task.updatedAt)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Category:</span>
                                    <span className="text-gray-900">{task.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}