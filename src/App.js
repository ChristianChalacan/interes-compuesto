import { Formik, Form } from "formik";
import { Input } from "./components/Input";
import Button from "./components/Button";
import Container from "./components/Container";
import Section from "./components/Section";
import Result from "./components/Result";
import { useState } from "react";
import * as Yup from "yup";

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit;
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1);
  }

  return Math.round(total);
};

const formattter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function App() {
  const [result, setResult] = useState(0);
  const initialValues = {
    deposit: "",
    contribution: "",
    years: "",
    rate: "",
  };

  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(
      parseFloat(deposit),
      parseFloat(contribution),
      parseInt(years),
      parseFloat(rate)
    );
    setResult(formattter.format(val));
  };

  return (
    <Container>
      <Section>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number()
              .required("Obligatorio")
              .typeError("Debe ser un numero"),
            contribution: Yup.number().required("Obligatorio"),
            years: Yup.number().required("Obligatorio"),
            rate: Yup.number()
              .required("Obligatorio")
              .min(0, "El valor minimo es 0")
              .max(1, "El valor maximo es 1"),
          })}
        >
          <Form>
            <Input name="deposit" label="Deposito inicial" />
            <Input
              name="contribution"
              label="Contribución Anual"
              type="number"
            />
            <Input name="years" label="Años" type="number" />
            <Input name="rate" label="Interés estimado" type="number" />
            <Button type="submit">Calcular</Button>
          </Form>
        </Formik>
        {result ? <Result>Balance final: {result}</Result> : null}
      </Section>
    </Container>
  );
}

export default App;
