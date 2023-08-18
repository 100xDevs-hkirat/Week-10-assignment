import { userState } from "@/store/atoms/user";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { api } from "@/util/api";

type Props = {};

export default function SignUp({}: Props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userAtom, setUserAtom] = useRecoilState(userState);
  const { push } = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isAdmin: false,
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userAtom?.isLoading) {
      return;
    }

    console.log("userAtom", userAtom);
    if (userAtom?.user?.email) {
      push("/");
    }

    return () => {};
  }, [userAtom]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: any) => {
    setUserAtom((prevData) => ({ ...prevData, isLoading: true }));
    api
      .post("user/signUp", data)
      .then(
        ({ data: signInResult }) => {
          console.log(signInResult);
          const { token, user } = signInResult;

          //set token in cookie
          Cookies.set("token", token, { expires: 7, path: "/" });

          setUserAtom({ user, isLoading: false });

          //redirect to home page
          // push("/");
        },
        (errors: AxiosError<{ message: string }>) => {
          alert(errors?.response?.data?.message);
          console.error(errors?.response?.data?.message);
        }
      )
      .finally(() =>
        setUserAtom((prevData) => ({ ...prevData, isLoading: false }))
      );
  };

  const handleSignIn = () => {
    push("/signIn");
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Card
        elevation={3}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{ borderRadius: 5, maxWidth: 360, margin: 5, padding: 2 }}
      >
        <CardContent>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h4" component="div">
              Sign up
            </Typography>
            <Button onClick={handleSignIn} variant="text">
              Sign in
            </Button>
          </Box>
          <br />
          <TextField
            error={Boolean(errors?.name)}
            helperText={errors?.name?.type}
            {...register("name", { required: true, maxLength: 20 })}
            type="text"
            size="small"
            margin="normal"
            fullWidth
            id="Name-basic"
            label="Name"
            variant="standard"
          />
          <TextField
            error={Boolean(errors?.email)}
            helperText={errors?.email?.type}
            {...register("email", { required: true, maxLength: 20 })}
            type="email"
            size="small"
            margin="normal"
            fullWidth
            id="Email-basic"
            label="Email"
            variant="standard"
          />
          <TextField
            error={Boolean(errors?.password)}
            helperText={errors?.password?.type}
            {...register("password", { required: true, maxLength: 20 })}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label="toggle password visibility"
                  //   edge="end"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              ),
            }}
            size="small"
            margin="normal"
            fullWidth
            id="Password-basic"
            label="Password"
            variant="standard"
          />
        </CardContent>
        <br />
        <CardActions>
          <LoadingButton
            loading={userAtom.isLoading}
            loadingPosition="start"
            startIcon={<></>}
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign up
          </LoadingButton>
        </CardActions>
        {/* <CardActions>
          <Button fullWidth variant="text">
            forgot password
          </Button>
        </CardActions> */}
      </Card>
    </Container>
  );
}
