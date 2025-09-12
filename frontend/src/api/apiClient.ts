import AxiosInstance from './axios';

export interface Task {
    id: number;
    title: string;
    description: string;
    progress: number;
    column_id: number;
    created_at: string;
    updated_at: string;
}

export interface Column {
    id: number;
    title: string;
    color: string;
    tasks: Task[];
    created_at: string;
    updated_at: string;
}

// Column API functions
export const ColumnAPI = {
    // Get all columns
    getAll: async (): Promise<Column[]> => {
        try {
            const response = await AxiosInstance.get<Column[]>('/columns');
            return response.data;
        } catch (error) {
            console.error('Error fetching columns:', error);
            throw error;
        }
    },

    // Create a new column
    create: async (column: { title: string; color: string }): Promise<Column> => {
        try {
            const response = await AxiosInstance.post<Column>('/columns', column);
            return response.data;
        } catch (error) {
            console.error('Error creating column:', error);
            throw error;
        }
    },

    // Update a column
    update: async (id: number, column: { title: string; color: string }): Promise<Column> => {
        try {
            const response = await AxiosInstance.put<Column>(`/columns/${id}`, column);
            return response.data;
        } catch (error) {
            console.error('Error updating column:', error);
            throw error;
        }
    },

    // Delete a column
    delete: async (id: number): Promise<void> => {
        try {
            await AxiosInstance.delete(`/columns/${id}`);
        } catch (error) {
            console.error('Error deleting column:', error);
            throw error;
        }
    },
};

// Task API functions
export const TaskAPI = {
    // Create a new task
    create: async (task: {
        title: string;
        description: string;
        progress: number;
        column_id: number
    }): Promise<Task> => {
        try {
            const response = await AxiosInstance.post<Task>('/tasks', task);
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    // Update a task
    update: async (id: number, task: {
        title?: string;
        description?: string;
        progress?: number
    }): Promise<Task> => {
        try {
            const response = await AxiosInstance.put<Task>(`/tasks/${id}`, task);
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    // Delete a task
    delete: async (id: number): Promise<void> => {
        try {
            await AxiosInstance.delete(`/tasks/${id}`);
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    },

    // Get tasks by column ID
    getByColumnId: async (columnId: number): Promise<Task[]> => {
        try {
            const response = await AxiosInstance.get<Task[]>(`/columns/${columnId}/tasks`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },
};