import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

export const logout = () => {
    if (typeof window !== "undefined") {
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
    }
};

export const useGetData = (
    endpoint,
    queryKey,
    withToken = false,
    params = {},
    options = {}
) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const headers = {};

            if (withToken) {
                const token = window.localStorage.getItem("access"); // Ambil token terbaru
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.get(endpoint, {
                params: params,
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error) => {
            if (error.response && error.response.status === 401) {
                logout(); // Jika token tidak valid atau kedaluwarsa, logout
            }
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        ...options,
    });
};

export const usePostData = (endpoint, withToken = false) => {
    return useMutation({
        mutationFn: async (data) => {
            const headers = {
                "Content-Type": "multipart/form-data",
            };

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.post(endpoint, data, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
        },
    });
};

export const usePutData = (endpoint, withToken = false) => {
    return useMutation({
        mutationFn: async (data) => {
            const headers = {
                "Content-Type": "multipart/form-data",
            };

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.put(endpoint, data, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
        },
    });
};

export const useDeleteData = (endpoint, withToken = false) => {
    return useMutation({
        mutationFn: async (id) => {
            const headers = {};

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.delete(`${endpoint}${id}/`, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
        },
    });
};