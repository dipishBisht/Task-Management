import { FileText, Download, MoreVertical, Upload } from 'lucide-react';

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

const mockFiles: File[] = [
  {
    id: '1',
    name: 'Project Requirements.pdf',
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Sarah Chen',
    uploadedAt: '2024-03-15',
  },
  {
    id: '2',
    name: 'Design Assets.zip',
    type: 'ZIP',
    size: '15.8 MB',
    uploadedBy: 'Emily Davis',
    uploadedAt: '2024-03-14',
  },
  {
    id: '3',
    name: 'Meeting Notes.docx',
    type: 'DOCX',
    size: '568 KB',
    uploadedBy: 'Mike Johnson',
    uploadedAt: '2024-03-13',
  },
];

export default function ProjectFiles() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Files</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Upload className="w-4 h-4" />
            Upload File
          </button>
        </div>

        <div className="space-y-4">
          {mockFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{file.name}</h3>
                  <p className="text-sm text-gray-600">
                    {file.size} • Uploaded by {file.uploadedBy}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-white">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}