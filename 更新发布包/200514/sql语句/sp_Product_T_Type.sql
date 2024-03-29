USE [BJG_DB]
GO
/****** Object:  StoredProcedure [dbo].[sp_Product_T_Type]    Script Date: 2020/5/14 19:38:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[sp_Product_T_Type]
@ProductFirstLevel int,
@StorerId int,
@result varchar(10) output
as
begin
    set @result='0'
    if @ProductFirstLevel=0 or @StorerId=0
    begin
        set @result='-1' return
    end
    declare @BN int
	set @BN=15
	if @ProductFirstLevel=6
	begin
		set @BN=30
	end

    select ProductFirstLevelId,ProductSecondLevelId,COUNT(*)*@BN as Total into #tmp_T_Type
    from ProductInfo
    where ProductFirstLevelId=@ProductFirstLevel and StoreId=@StorerId
    and Store_Flag=1
    group by ProductFirstLevelId,ProductSecondLevelId
    
    declare @Total_Tmp int,@ProductFirstLevelId_Tmp int,@ProductSecondLevelId_Tmp int 
    
    DECLARE ProuctType CURSOR FOR
    select ProductFirstLevelId,ProductSecondLevelId,Total
    from #tmp_T_Type
     
    open ProuctType
    FETCH NEXT FROM ProuctType
    INTO @ProductFirstLevelId_Tmp,@ProductSecondLevelId_Tmp,@Total_Tmp
      
      while @@FETCH_STATUS = 0
      begin
       declare @count float
       select @count=Sum(meter) from UserInfo
       where ProductFirstLevelId=@ProductFirstLevelId_Tmp
       and ProductSecondLevelId=@ProductSecondLevelId_Tmp
       and StoreId=@StorerId
       if @count>=@Total_Tmp
       begin
           delete from #tmp_T_Type
           where ProductFirstLevelId=@ProductFirstLevelId_Tmp
           and ProductSecondLevelId=@ProductSecondLevelId_Tmp
       end
       FETCH NEXT FROM ProuctType
       INTO @ProductFirstLevelId_Tmp,@ProductSecondLevelId_Tmp,@Total_Tmp
     END
     CLOSE ProuctType
     DEALLOCATE ProuctType

     select a.* ,b.ProductFirstLevelName,c.ProductSecondLevelName
     from #tmp_T_Type a left join dbo.ProductFirstLevelInfo b
     on a.ProductFirstLevelId=b.ProductFirstLevelId
     left join dbo.ProductSecondLevelInfo c
     on a.ProductSecondLevelId=c.ProductSecondLevelId
   
end
