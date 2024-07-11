const PageTitle: React.FC<{title: string}> = ({ title }) => {
  return (
    <h3 className="font-bold text-3xl">{title}</h3>
  )
}

export default PageTitle