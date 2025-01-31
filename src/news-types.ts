type NewsApiResponse ={
  status: string;
  totalResults: number;
  articles: Article[];
}

type Source = {
  id: string | null;
  name: string;
}

type Article = {
  source: Source;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
  
export type { NewsApiResponse, Source, Article };
  