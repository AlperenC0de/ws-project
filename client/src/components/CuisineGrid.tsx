import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import type { Cuisine } from "@/lib/types";

export function CuisineGrid() {
  const { data: cuisines, isLoading } = useQuery<Cuisine[]>({
    queryKey: ['/api/cuisines'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="w-full h-32 bg-gray-300 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {cuisines?.map((cuisine) => (
        <Link key={cuisine.id} href={`/cuisine/${cuisine.name}`}>
          <Card className="cuisine-card bg-warm-gray hover:shadow-lg">
            <CardContent className="p-6 text-center">
              <img 
                src={cuisine.imageUrl || "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200"} 
                alt={cuisine.name}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
              <h4 className="text-lg font-poppins font-semibold mb-2">
                {cuisine.flag} {cuisine.name}
              </h4>
              <p className="text-sm text-gray-600">{cuisine.featured}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
