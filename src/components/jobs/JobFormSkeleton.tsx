import React from "react";

const JobFormSkeleton = () => {
    return (
        <div className="flex min-h-screen">
            <div className="w-full">
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 dark:bg-[#1e2746] dark:border-gray-700 dark:shadow-md border">
                    <div className="space-y-2 text-center">
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
                        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto" />
                    </div>

                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                                    <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                                <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-[400px] w-full bg-gray-200 rounded animate-pulse" />
                            <div className="space-y-2">
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="h-9 w-48 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobFormSkeleton;
