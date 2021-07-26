import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import firebase from "./firebase";

import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";

let count = 0;

{
  if (count == 1) {
    ("これまでに学習したことのあるプログラミング言語をすべて教えて下さい。");
  }
}

export default function Home() {
  const [isLearning, setIsLearning] = useState(false);
  const [wasLearning, setWasLearning] = useState(false);

  const onChange = (value, name) => {
    console.log(value);
    console.log(name);
    if (name === "isLearning") {
      setIsLearning(value);
    } else {
      setWasLearning(value);
    }
  };

  console.log(isLearning);
  console.log(wasLearning);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    firebase
      .firestore()
      .collection("messages")
      .add({
        user: data.name,
        birth: data.birth,
        question1: data.isLearning,
        question2: data.wasLearning,
        // question: data.wasLearning2,
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container>
        <h1>プログラミングに関するアンケート</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください。（匿名可）</label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
            />
          </div>
          <div>
            <label htmlFor="birth">
              Q2. 生年月日を入力してください。（例：19900101）
            </label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^[0-9]{8}$/ }}
              render={({ field: { value, onChange } }) => (
                <Input value={value} onChange={onChange} />
              )}
            />
            {errors.birth && errors.birth.type === "required" ? (
              <span>このフィールドは回答必須です。</span>
            ) : null}
            {errors.birth && errors.birth.type === "pattern" ? (
              <span>整数の８桁で入力してください</span>
            ) : null}
          </div>
          <>
            <div>
              <span>Q3. 現在プログラミングを学習していますか？</span>
              <input
                id="isLearning1"
                {...register("isLearning", { required: true })}
                name="isLearning"
                type="radio"
                onClick={(e, cheked) => onChange(true, "isLearning")}
              />
              <label htmlFor="isLearning1">はい</label>
              <input
                id="isLearning2"
                {...register("isLearning", { required: true })}
                name="isLearning"
                type="radio"
                value="off"
                onClick={(e, checked) => onChange(false, "isLearning")}
              />
              <label htmlFor="isLearning2">いいえ</label>
            </div>

            <div>
              <label>
                Q4. これまでに、プログラミングを学習したことがありますか？
              </label>
              <input
                id="wasLearning1"
                {...register("wasLearning", { required: true })}
                name="wasLearning"
                type="radio"
                onClick={(e, checked) => onChange(true, "wasLearning")}
              />
              <label htmlFor="wasLearning1">はい</label>

              <input
                id="wasLearning2"
                {...register("wasLearning", { required: true })}
                name="wasLearning"
                type="radio"
                onClick={(e, checked) => onChange(false, "wasLearning")}
              />
              <label htmlFor="wasLearning2">いいえ</label>
            </div>

            {isLearning === true || wasLearning === true ? (
              <span>
                今まで学習したことのあるプログラミング言語をすべて教えてください。
              </span>
            ) : null}
          </>

          <input type="submit" value="アンケートを提出する" />
        </form>
      </Container>
    </>
  );
}
