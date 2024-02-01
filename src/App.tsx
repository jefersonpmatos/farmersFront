import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Register } from "./components/Register";
import { Grid2X2, LandPlot, Leaf, Pencil, Tractor, Trash } from "lucide-react";
import { TotalFarmsByStateChart } from "./components/charts/totalFarmsByState";
import { TotalFarmsAreaByStateChart } from "./components/charts/totalFarmsAreaByState";
import { TotalCultivableAreaByStateChart } from "./components/charts/totalCultivableAreaByState";
import { TotalVegetableAreaByStateChart } from "./components/charts/totalVegetableAreaByState";
import { TotalSoloUseChart } from "./components/charts/totalSoloUse";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CropsChart } from "./components/charts/crops";
import { Button } from "./components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

interface StateFarm {
  state: string;
  totalFarms: number;
  totalArea: number;
  totalCultivableArea: number;
  totalVegetationArea: number;
}

interface Crop {
  name: string;
  totalFarms: number;
}

interface FarmMetrics {
  totalFarms: number;
  totalArea: number;
  cultivableAreaHectares: number;
  vegetationAreaHectares: number;
  totalNumberOfStates: number;
  stateWithMostFarms: string;
  stateWithLessFarms: string;
  totalFarmsByState: StateFarm[];
  totalCrops: number;
  crops: Crop[];
}

export interface Farmer {
  id: number;
  cpfCnpj: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalAreaHectares: number;
  cultivableAreaHectares: number;
  vegetationAreaHectares: number;
  crops: Crop[];
}

function App() {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<FarmMetrics>();
  const [farmers, setFarmers] = useState<Farmer[]>();
  const [farmerToEdit, setFarmerToEdit] = useState<Farmer>();

  const fetchFarmers = () => {
    const options = { method: "GET" };

    fetch("https://farmers-api-2nhh.vercel.app/farmers", options)
      .then((response) => response.json())
      .then((response) => setFarmers(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const options = { method: "GET" };

    fetch("https://farmers-api-2nhh.vercel.app/metrics", options)
      .then((response) => response.json())
      .then((response) => setMetrics(response))
      .catch((err) => console.error(err));

    fetchFarmers();
  }, []);

  const handleDeleteFarmer = (id: number) => {
    fetch(`https://farmers-api-2nhh.vercel.app/farmer/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        toast({
          title: "Sucesso!",
          description: "Agricultor excluído!",
        });
        fetchFarmers();
      })
      .catch((err) => console.error(err));
  };

  const handleEditFarmer = (id: number) => {
    const farmer = farmers?.find((f) => f.id === id);

    if (farmer) {
      setFarmerToEdit(farmer);
    }
  };

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <Toaster />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Agriculture</h2>
        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger>
              <Button>Novo agricultor</Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Novo agricultor</SheetTitle>
                <SheetDescription>Cadastre um novo agricultor</SheetDescription>
                <Register refetch={fetchFarmers} />
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex-1 space-y-4 pt-6">
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="register">Agricultores</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total de fazendas
                  </CardTitle>
                  <Tractor strokeWidth={1} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.totalFarms}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Area total das fazendas em hectares
                  </CardTitle>
                  <Grid2X2 strokeWidth={1} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.totalArea}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Area total de hectares cultiváveis
                  </CardTitle>
                  <LandPlot strokeWidth={1} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.cultivableAreaHectares}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Area total de hectares de vegetação
                  </CardTitle>
                  <Leaf strokeWidth={1} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.vegetationAreaHectares}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Area total em hectares por estado</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3">
                    <div>
                      <p>Área total por estado</p>
                      <TotalFarmsAreaByStateChart
                        totalFarmsByState={metrics.totalFarmsByState}
                      />
                    </div>

                    <div>
                      <p>Área cultivável por estado</p>
                      <TotalCultivableAreaByStateChart
                        totalFarmsByState={metrics.totalFarmsByState}
                      />
                    </div>

                    <div>
                      <p>Área de vegetação por estado</p>
                      <TotalVegetableAreaByStateChart
                        totalFarmsByState={metrics.totalFarmsByState}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Uso total do solo em hectares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TotalSoloUseChart
                      vegetationAreaHectares={metrics.vegetationAreaHectares}
                      cultivableAreaHectares={metrics.cultivableAreaHectares}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Total de cultura</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CropsChart crops={metrics.crops} />
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-3">
                <Card className="">
                  <CardHeader>
                    <CardTitle>Total de fazendas por estado</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TotalFarmsByStateChart
                      totalFarmsByState={metrics.totalFarmsByState}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <Table>
              <TableCaption>Agricultores</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Nome da fazenda</TableHead>
                  <TableHead>Cidade</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Area total (Hectares)</TableHead>
                  <TableHead>Area cultivável(Hectares)</TableHead>
                  <TableHead>Área de vegetação (Hectares)</TableHead>
                  <TableHead>Culturas</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmers?.map((farmer) => (
                  <TableRow key={farmer.id}>
                    <TableCell>{farmer.id}</TableCell>
                    <TableCell>{farmer.name}</TableCell>
                    <TableCell>{farmer.farmName}</TableCell>
                    <TableCell>{farmer.city}</TableCell>
                    <TableCell>{farmer.state}</TableCell>
                    <TableCell>{farmer.totalAreaHectares}</TableCell>
                    <TableCell>{farmer.cultivableAreaHectares}</TableCell>
                    <TableCell>{farmer.vegetationAreaHectares}</TableCell>
                    <TableCell>
                      {farmer?.crops?.map((crop, index) => (
                        <span key={index}>{crop.name}, </span>
                      ))}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Sheet>
                        <SheetTrigger>
                          <Pencil
                            size={16}
                            className="cursor-pointer"
                            onClick={() => handleEditFarmer(farmer.id)}
                          />
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Novo agricultor</SheetTitle>
                            <SheetDescription>
                              Cadastre um novo agricultor
                            </SheetDescription>
                            <Register
                              farmerToEdit={farmerToEdit}
                              refetch={fetchFarmers}
                            />
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                      <Trash
                        size={16}
                        className="cursor-pointer"
                        onClick={() => handleDeleteFarmer(farmer.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
