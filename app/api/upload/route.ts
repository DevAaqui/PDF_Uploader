import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const files = formData.getAll('files') as File[]

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No files provided' },
                { status: 400 }
            )
        }

        // Validate file types
        const validFiles = files.filter(file => file.type === 'application/pdf')

        if (validFiles.length === 0) {
            return NextResponse.json(
                { error: 'No valid PDF files found' },
                { status: 400 }
            )
        }

        // Process files (in a real app, you'd save them to storage)
        const processedFiles = validFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        }))

        return NextResponse.json({
            message: 'Files uploaded successfully',
            files: processedFiles,
            count: processedFiles.length
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Upload API endpoint',
        methods: ['POST'],
        description: 'Upload PDF files to the server'
    })
} 