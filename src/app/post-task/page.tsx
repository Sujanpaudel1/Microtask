'use client';

import { useState } from 'react';
import { categories } from '@/lib/mockData';
import { DollarSign, FileText, Tag, AlertCircle, CheckCircle } from 'lucide-react';

export default function PostTaskPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        budgetMin: '',
        budgetMax: '',
        deadline: '',
        difficulty: 'Medium',
        skillsRequired: '',
        tags: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-sm border p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Posted Successfully!</h2>
                    <p className="text-gray-600 mb-6">
                        Your task has been posted and is now visible to freelancers. You&apos;ll start receiving proposals soon.
                    </p>
                    <div className="space-y-3">
                        <button
                            onClick={() => window.location.href = '/tasks/' + Date.now()}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            View Your Task
                        </button>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Post Another Task
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Task</h1>
                    <p className="text-gray-600">
                        Provide clear details about your task to attract the best freelancers
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Basic Information
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Task Title *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Design a Logo for My Startup"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Task Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={6}
                                    placeholder="Provide a detailed description of what you need done. Include specific requirements, deliverables, and any important details..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.slice(1).map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                                        Difficulty Level
                                    </label>
                                    <select
                                        id="difficulty"
                                        name="difficulty"
                                        value={formData.difficulty}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Budget and Timeline */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <DollarSign className="w-5 h-5 mr-2" />
                            Budget and Timeline
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Budget Range (NPR) *
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="number"
                                            name="budgetMin"
                                            value={formData.budgetMin}
                                            onChange={handleInputChange}
                                            placeholder="Minimum budget (NPR)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                            min="100"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            name="budgetMax"
                                            value={formData.budgetMax}
                                            onChange={handleInputChange}
                                            placeholder="Maximum budget (NPR)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                            min="100"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Deadline *
                                </label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Skills and Tags */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                            <Tag className="w-5 h-5 mr-2" />
                            Skills and Tags
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="skillsRequired" className="block text-sm font-medium text-gray-700 mb-2">
                                    Required Skills *
                                </label>
                                <input
                                    type="text"
                                    id="skillsRequired"
                                    name="skillsRequired"
                                    value={formData.skillsRequired}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Graphic Design, Adobe Illustrator, Logo Design (separate with commas)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    List the skills needed for this task, separated by commas
                                </p>
                            </div>

                            <div>
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="e.g., urgent, startup, creative, modern (separate with commas)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Add relevant tags to help freelancers find your task
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Important Information */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <div className="flex items-start space-x-3">
                            <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5" />
                            <div>
                                <h3 className="font-medium text-yellow-800 mb-2">Important Guidelines</h3>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• Be specific about your requirements and deliverables</li>
                                    <li>• Set a realistic budget and timeline</li>
                                    <li>• Include examples or references if possible</li>
                                    <li>• Respond promptly to freelancer questions</li>
                                    <li>• Payment is only released when you&apos;re satisfied with the work</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Posting Task...' : 'Post Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}