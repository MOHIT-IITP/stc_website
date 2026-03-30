export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  status: number
  error: string
  message?: string
}

export async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json()
  
  if (!response.ok) {
    if (response.status === 401) {
      throw {
        status: 401,
        error: 'Unauthorized',
        message: 'Please login to continue'
      } as ApiError
    }
    
    if (response.status === 403) {
      throw {
        status: 403,
        error: 'Insufficient permissions',
        message: data.message || 'You do not have permission to perform this action'
      } as ApiError
    }
    
    if (response.status === 404) {
      throw {
        status: 404,
        error: 'Not found',
        message: data.error || 'The requested resource was not found'
      } as ApiError
    }
    
    throw {
      status: response.status,
      error: data.error || 'An error occurred',
      message: data.message || data.error || 'Something went wrong'
    } as ApiError
  }
  
  return data
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError
    return apiError.message || apiError.error || 'An unexpected error occurred'
  }
  
  return 'An unexpected error occurred'
}

export function isPermissionError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError
    return apiError.status === 403
  }
  return false
}

export function isAuthError(error: unknown): boolean {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError
    return apiError.status === 401
  }
  return false
}
