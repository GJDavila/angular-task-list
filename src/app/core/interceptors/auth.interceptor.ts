import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiQW5ndWxhciBOZXJkZXJ5IiwicHJvamVjdElkIjoiYzIxZjJlODYtYzJhZi00OGUxLTk3ZjctMzEyMGFhMThlYjMxIiwiZnVsbE5hbWUiOiJHcmltYWxkbyBEYXZpbGEiLCJlbWFpbCI6ImdyaW1hbGRvQHJhdm4uY28iLCJpYXQiOjE3MTgxMzU5Njd9.sgTUSRrv3KZtdykg36N5vIN4l6NzuyGDNlKYKpyoMoI';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
