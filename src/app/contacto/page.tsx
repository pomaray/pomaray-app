"use client";

import { useEffect, useState } from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody, Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { GetStudents } from "@/app/api/student";
import { Student } from "@/types/student";
import { YearBookForm } from "@/types/yearbook";
import useYearBookStore from "@/hooks/yearbookStore";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { getObjects } from "@/utils/utils";

export default function App() {
  const [selected, setSelected] = useState("login");
  const [students, setStudents] = useState<Student[]>()
  const [error, setError] = useState("Error ya tu sabes")
  const [isOpen, setIsOpen] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const {
    techs,
    formData,
    setFormData,
    resetState
  } = useYearBookStore((state) => state);
  const [_,] = useInfiniteScroll({
    isEnabled: isOpen,
    onLoadMore: () => {
      findYearBook(formData)
    },
    hasMore: hasMore,
    shouldUseLoader: true
  })

  const findYearBook = async (data: YearBookForm) => {
    setStudents([]);
    setError("");
    try {
      const results = await GetStudents(data);
      setStudents(results.students);

      if (results.total < 1) {
        setError("No se encontro ningun estudiante.")
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message :
          "Algo no salió como se esperaba"
      );
    }
  }

  useEffect(() => {
    if (formData.tecnique) {
      if (formData.years && formData.years.length > 1) {
        const newData: YearBookForm = {
          ...formData,
          years: [2024],
        };
        setFormData(newData);
      }
      findYearBook(formData);
    }
  }, [formData]);
  return (
    <main className="flex flex-col w-screen justify-center items-center h-[90dvh]
    bg-gradient-to-b from-primary to-green-600">
      <Card className="max-w-full w-[400px] h-[440px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(selected) => {
              setSelected(selected.toString());
            }}
          >
            <Tab key="excusas" title="Excusas" className="h-full w-full">
              {
                !error ? (
                  <form className="flex flex-col h-full gap-4  items-center w-full">
                    <Autocomplete
                      defaultItems={students || []}
                      errorMessage={!formData.tecnique && "Debe selecionar una tecnica antes de buscar."}

                      isRequired
                      isLoading={isLoading}
                      isDisabled={!students || !formData.tecnique}

                      label="Estudiante"
                      placeholder="Nombre del estudiante"

                      color={formData.tecnique ? "primary" : "danger"}
                      variant="bordered"
                    >
                      {(student: Student) => (
                        <AutocompleteItem key={student._id} textValue={`${student.first_name} ${student.last_name}`}>
                          <div className="flex gap-2 items-center">
                            <Avatar alt={student.first_name} className="flex-shrink-0" size="sm" src={student.photo_url} />
                            <span className="text-medium">{`${student.first_name} ${student.last_name}`}</span>
                          </div>
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <Autocomplete
                      placeholder={techs.length ? "Seleccionar técnica" : "Sin resultados."}
                      label={"Técnica"}
                      color="primary"
                      onSelectionChange={(selectedTech) => {
                        if (selectedTech) {
                          const newData: YearBookForm = {
                            ...formData,
                            tecnique: selectedTech.toString(),
                          };
                          setFormData(newData);
                        }
                        resetState()
                      }}
                      isLoading={isLoading}
                      defaultItems={getObjects(techs)}
                      isDisabled={techs.length < 1}
                      isRequired
                      className="col-span-1"
                      variant="bordered"
                    >
                      {(tech) => <AutocompleteItem key={tech.value}>{tech.value}</AutocompleteItem>}
                    </Autocomplete>
                  </form>
                ) : (
                  <div className="grid place-content-center h-full">
                    <span className="text-danger">{error}</span>
                  </div>
                )
              }
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </main>
  );
}
