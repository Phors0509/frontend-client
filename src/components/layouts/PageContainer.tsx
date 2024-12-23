interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto  px-4 py-6">
      {children}
    </div>
  </div>
);